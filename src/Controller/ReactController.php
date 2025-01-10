<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    // #[Route('/', name: 'home')]
    // public function index(): Response
    // {
    //     return $this->render('base.html.twig');
    // }

    #[Route('/{reactRouting}', name: 'react', requirements: ['reactRouting' => '.*'])]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }

    // #[Route('/api/ez', name: 'api_ez')]
    // public function ez(): Response
    // {
    //     return new Response('OKOK');
    // }

}
