<?php

namespace App\Controller;

use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class BookController extends AbstractController
{
    #[Route('/api/all-books', name: 'get_books', methods: ['GET'])]
    public function AllBooks(BookRepository $bookRepository): JsonResponse
    {
        $books = $bookRepository->findAll();

        $booksArray = array_map(function ($book) {
            return [
                'id' => $book->getId(),
                'name' => $book->getName(),
                'description' => $book->getDescription(),
                'category_id' => $book->getCategoryId(),
                'pages' => $book->getPages(),
                'publication_date' => $book->getPublicationDate()?->format('Y-m-d H:i:s'),
                'created_at' => $book->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $book->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ];
        }, $books);

        return $this->json($booksArray);
    }
}
