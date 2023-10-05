<?php

namespace App\Controller;

use App\Repository\MutualHelpRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MutualHelpController extends AbstractController
{
    public function __construct(
        private readonly MutualHelpRepository $mutualHelpRepository,
    )
    {}

    #[Route('/mutualhelp', name: 'app_mutual_help')]
    public function index(): JsonResponse
    {
        return $this->json($this->mutualHelpRepository->findAll(), 200, [], ['groups' => 'items:read']);
    }

    #[Route('/mutualhelp/{id}', name: 'app_mutual_help_show')]
    public function show($id): JsonResponse
    {
        return $this->json($this->mutualHelpRepository->find($id), 200, [], ['groups' => 'items:read']);
    }

}
