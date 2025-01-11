<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Psr\Log\LoggerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Ramsey\Uuid\Uuid;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AuthController extends AbstractController
{
    private $entityManager;
    private $passwordHasher;
    private $jwtTokenManager;
    private $logger;


    public function __construct(
        EntityManagerInterface $entityManager, 
        UserPasswordHasherInterface $passwordHasher, 
        JWTTokenManagerInterface $jwtTokenManager,
        LoggerInterface $logger
        )
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->jwtTokenManager = $jwtTokenManager;
        $this->logger = $logger;
    }
    
    #[Route('/api/register', name: 'api_register', methods: ["POST"])]
    public function Register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password'])) {
            return new JsonResponse(['error' => 'Email and password are required'], 400);
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse(['error' => 'Invalid email format'], 400);
        }

        $existingUser = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy(['email' => $data['email']]);

        if ($existingUser) {
            return new JsonResponse(['error' => 'Email is already in use'], 400);
        }

        try {
            $uuid = Uuid::uuid4()->toString();

            $user = new User();
            $user->setUuid($uuid);
            $user->setEmail($data['email']);
            $user->setPassword(
                $this->passwordHasher->hashPassword($user, $data['password'])
            );

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'User registered successfully'], 201);
        } catch (\Exception) {
            return new JsonResponse(['error' => 'An error occurred while registering the user'], 500);
        }
    }

    #[Route('/api/login', name: 'api_login', methods: ["POST"])]
    public function Login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $this->logger->info('Token JWT généré pour l\'utilisateur.', [
                'token' => $data,
        ]);


        if (empty($data['email']) || empty($data['password'])) {
            return new JsonResponse(['error' => 'Email and password are required'], 400);
        }

        $user = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy(['email' => $data['email']]);

        if (!$user) {
            return new JsonResponse(['error' => 'Invalid email or password'], 401);
        }

        if (!$this->passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['error' => 'Invalid email or password'], 401);
        }

        try {
            $token = $this->jwtTokenManager->create($user);


            return new JsonResponse([
                'message' => 'Login successful',
                'token' => $token,
            ], 200);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'An error occurred while generating the token', $e], 500);
        }
    }
}
