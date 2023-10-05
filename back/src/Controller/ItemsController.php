<?php

namespace App\Controller;

use App\Entity\Items;
use App\Repository\CategoriesRepository;
use App\Repository\ItemsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ItemsController extends AbstractController
{

    public function __construct
    (
        private readonly ItemsRepository        $itemsRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly CategoriesRepository   $categoriesRepository,
    )
    {}

    #[Route('/items', name: 'app_items')]
    public function index(): JsonResponse
    {
        return $this->json($this->itemsRepository->findAll(), 200, [], ['groups' => 'items:read']);
    }

    #[Route('/items/{id}', name: 'app_items_show')]
    public function show($id): JsonResponse
    {
        return $this->json($this->itemsRepository->find($id), 200, [], ['groups' => 'items:read']);
    }

    #[Route('/items-add', name: 'app_items_create', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer): JsonResponse
    {
        try{
            $content = $request->getContent();
            $data = json_decode($content, true);

            if(isset($data['categories']))
            {
                $categoryId = $data['categories'];
                $category = $this->categoriesRepository->find($categoryId);

                if($category)
                {
                    $item = $serializer->denormalize($data, Items::class);
                    $item->setCategories($category);

                    $this->entityManager->persist($item);
                    $this->entityManager->flush();

                    return $this->json($item, 201, [], ['groups' => 'items:read']);
                } else {
                    return $this->json('Category not found', 400);
                }
            } else {
                return $this->json('Category not found', 400);
            }

        } catch (\Exception $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    // A vérifier avec le front si tout se passe bien
    #[Route('/items-edit/{id}', name: 'app_items_update', methods: ['PUT'])]
    public function update(Request $request, $id): JsonResponse
    {
        try{

            $item = $this->itemsRepository->find($id);
            $content = $request->getContent();

            if($item)
            {
                $data = json_decode($content, true);

                if(isset($data['categories']))
                {
                    $categoryId = $data['categories'];
                    $category = $this->categoriesRepository->find($categoryId);

                    if($category)
                    {
                        $item->setTitle($data['title']);
                        $item->setDescription($data['description']);
                        $item->setCategories($category);

                        $this->entityManager->persist($item);
                        $this->entityManager->flush();

                        return $this->json($item, 201, [], ['groups' => 'items:read']);
                    } else {
                        return $this->json('Category not found', 400);
                    }
                } else {
                    return $this->json('Category not found', 400);
                }
            } else {
                return $this->json('Item not found', 400);
            }

        }catch (\Exception $e) {
            return $this->json($e->getMessage(), 400);
        }

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
