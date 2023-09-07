<?php

namespace App\Controller;

use App\Repository\CategoriesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;

class CategoriesController extends AbstractController
{
    public function __construct
    (
        private readonly CategoriesRepository $categoriesRepository,
    )
    {}

    #[Route('/categories', name: 'app_categories')]
    public function index(): JsonResponse
    {
        return $this->json($this->categoriesRepository->findAll(), 200, [], ['groups' => 'categories:read']);
    }

    #[Route('/categories/{id}', name: 'app_categories_show')]
    public function show($id): JsonResponse
    {
        return $this->json($this->categoriesRepository->find($id), 200, [], ['groups' => 'categories:read']);
    }
}
