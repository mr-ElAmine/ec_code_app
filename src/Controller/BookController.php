<?php

namespace App\Controller;

use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class BookController extends AbstractController
{
    #[Route('/api/all-books', name: 'get_books', methods: ['GET'])]
    public function AllBooks(BookRepository $bookRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $books = $bookRepository->findAll();

        // Fetch average ratings for books
        $query = $entityManager->createQuery(
            'SELECT b.id AS bookId, AVG(br.rating) AS avgRating 
             FROM App\Entity\BookRead br 
             JOIN br.book b 
             GROUP BY b.id'
        );
        $ratings = $query->getResult();

        // Map ratings to an associative array
        $ratingsMap = [];
        foreach ($ratings as $rating) {
            $ratingsMap[$rating['bookId']] = (float)$rating['avgRating'];
        }

        // Build the books array with average ratings
        $booksArray = array_map(function ($book) use ($ratingsMap) {
            return [
                'id' => $book->getId(),
                'name' => $book->getName(),
                'description' => $book->getDescription(),
                'category_id' => $book->getCategoryId(),
                'pages' => $book->getPages(),
                'publication_date' => $book->getPublicationDate()?->format('Y-m-d H:i:s'),
                'created_at' => $book->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $book->getUpdatedAt()?->format('Y-m-d H:i:s'),
                'average_rating' => $ratingsMap[$book->getId()] ?? null, 
            ];
        }, $books);

        return $this->json($booksArray);
    }
}
