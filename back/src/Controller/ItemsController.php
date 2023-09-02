<?php

namespace App\Controller;

use App\Entity\Items;
use App\Repository\ItemsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ItemsController extends AbstractController
{
    public function __construct
    (
        private readonly ItemsRepository        $itemsRepository,
        private readonly EntityManagerInterface $entityManager,
    )
    {}

    #[Route('/items', name: 'app_items')]
    public function index(): JsonResponse
    {
        $items = $this->itemsRepository->findAll();

        return $this->json($items);
    }

    #[Route('/items/{id}', name: 'app_items_show')]
    public function show($id): JsonResponse
    {
        $item = $this->itemsRepository->find($id);

        return $this->json($item);
    }

    #[Route('/items-add', name: 'app_items_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $item = new Items();

        if($content = $request->getContent())
        {
            $data = json_decode($content, true);

            $item->setTitle($data['title']);
            $item->setDescription($data['description']);
        }

        $this->entityManager->persist($item);
        $this->entityManager->flush();

        return $this->json($item);
    }

    // A vérifier avec le front si tout se passe bien
    #[Route('/items-edit/{id}', name: 'app_items_update', methods: ['PUT'])]
    public function update(Request $request, $id): JsonResponse
    {
        $item = $this->itemsRepository->find($id);

        if($content = $request->getContent())
        {
            $data = json_decode($content, true);

            $item->setTitle($data['title']);
            $item->setDescription($data['description']);
        }

        $this->entityManager->persist($item);
        $this->entityManager->flush();

        return $this->json($item);
    }

    #[Route('/items-delete/{id}', name: 'app_items_delete', methods: ['DELETE'])]
    public function delete($id): JsonResponse
    {
        $item = $this->itemsRepository->find($id);

        $this->entityManager->remove($item);
        $this->entityManager->flush();

        return $this->json($item);
    }
}
