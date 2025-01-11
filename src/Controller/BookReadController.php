<?php

namespace App\Controller;

use App\Entity\BookRead;
use App\Entity\Book;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CategoryRepository;

class BookReadController extends AbstractController
{
    #[Route('/book/read/add', name: 'app_book_read_add', methods: ['POST'])]
    public function ReadAdd(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['user_email']) || empty($data['book_id']) || !isset($data['rating'])) {
            return new JsonResponse(['message' => 'Missing required fields.'], 400);
        }

        try {
            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['user_email']]);
            if (!$user) {
                return new JsonResponse(['message' => 'User not found.'], 404);
            }

            $book = $entityManager->getRepository(Book::class)->find($data['book_id']);
            if (!$book) {
                return new JsonResponse(['message' => 'Book not found.'], 404);
            }

            $bookRead = new BookRead();
            $bookRead->setUserId($user->getId());
            $bookRead->setBook($book);
            $bookRead->setRating($data['rating']);
            $bookRead->setDescription($data['description'] ?? null);
            $bookRead->setRead($data['is_read'] ?? false);
            $bookRead->setCover($data['cover'] ?? null);
            $bookRead->setCreatedAt(new \DateTime());
            $bookRead->setUpdatedAt(new \DateTime());

            $entityManager->persist($bookRead);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Book read added successfully.'], 201);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Internal server error.', 'error' => $e->getMessage()], 500);
        }
    }

    #[Route('/book/read/update', name: 'app_book_read_update', methods: ['PUT'])]
    public function updateBookRead(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['book_read_id'])) {
            return new JsonResponse(['message' => 'Missing required field: book_read_id.'], 400);
        }

        try {
            $bookRead = $entityManager->getRepository(BookRead::class)->find($data['book_read_id']);
            if (!$bookRead) {
                return new JsonResponse(['message' => 'BookRead not found.'], 404);
            }

            if (isset($data['rating'])) {
                $bookRead->setRating($data['rating']);
            }
            if (isset($data['description'])) {
                $bookRead->setDescription($data['description']);
            }
            if (isset($data['is_read'])) {
                $bookRead->setRead($data['is_read']);
            }

            $bookRead->setUpdatedAt(new \DateTime());

            $entityManager->persist($bookRead);
            $entityManager->flush();

            return new JsonResponse(['message' => 'BookRead updated successfully.'], 200);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Internal server error.', 'error' => $e->getMessage()], 500);
        }
    }

    #[Route('/book/read/user', name: 'app_book_read_user', methods: ['GET'])]
    public function getBooksReadByUser(Request $request, EntityManagerInterface $entityManager, CategoryRepository $categoryRepository): JsonResponse
    {
        $userEmail = $request->query->get('user_email');

        if (empty($userEmail)) {
            return new JsonResponse(['message' => 'Missing required field: user_email.'], 400);
        }

        try {
            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $userEmail]);
            if (!$user) {
                return new JsonResponse(['message' => 'User not found.'], 404);
            }

            $booksRead = $entityManager->getRepository(BookRead::class)->findBy(['user_id' => $user->getId()]);

            $response = [];
            foreach ($booksRead as $bookRead) {
                $response[] = [
                    'id' => $bookRead->getId(), 
                    'rating' => $bookRead->getRating(),
                    'description' => $bookRead->getDescription(),
                    'is_read' => $bookRead->isRead(),
                    'cover' => $bookRead->getCover(),
                    'created_at' => $bookRead->getCreatedAt()->format('Y-m-d H:i:s'),
                    'updated_at' => $bookRead->getUpdatedAt()->format('Y-m-d H:i:s'),
                    'book' => [
                        'id' => $bookRead->getBook()->getId(),
                        'name' => $bookRead->getBook()->getName(),
                        'description' => $bookRead->getBook()->getDescription(),
                        'category' => ($category = $categoryRepository->findOneBy(['id' => $bookRead->getBook()->getCategoryId()])) ? $category->getName() : null,

                    ],
                ];
            }

            return new JsonResponse($response, 200);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Internal server error.', 'error' => $e->getMessage()], 500);
        }
    }
}
