<?php

namespace App\Controller;

use App\Repository\MutualAttributesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class MutualAttributesController extends AbstractController
{
    public function __construct(
        private readonly MutualAttributesRepository $mutualAttributesRepository,
    )
    {}

    #[Route('/mutual/attributes', name: 'app_mutual_attributes')]
    public function index(): JsonResponse
    {
        return $this->json($this->mutualAttributesRepository->findAll(), 200, [], ['groups' => 'items:read']);
    }
}
