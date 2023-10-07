<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CategoryController extends AbstractController
{
    #[Route('/api/categories', name: 'categories', methods: ['GET'])]
    public function getCategories(CategoryRepository $categoryRepository, SerializerInterface $serializer): JsonResponse
    {
        $categoryList = $categoryRepository->findAll();
        $jsonCategoryList = $serializer->serialize($categoryList, 'json', ['groups' => 'getCategories']);
        return new JsonResponse($jsonCategoryList, 200, [], true);
    }

    #[Route('/api/categories/{id}', name: 'detailCategory', methods: ['GET'])]
    public function getDetailCategory(Category $category, SerializerInterface $serializer): JsonResponse
    {
        $jsonCategory = $serializer->serialize($category, 'json', ['groups' => 'getCategories']);
        return new JsonResponse($jsonCategory, 200, ['accept' => 'json'], true);
    }

    #[Route('/api/categories/{name}/articles', name: 'getArticleByCategory', methods: ['GET'])]
    public function getArticleByCategory(CategoryRepository $categoryRepository, SerializerInterface $serializer, string $name): JsonResponse
    {
        $category = $categoryRepository->findOneBy(['name' => $name]);
        $jsonCategory = $serializer->serialize($category, 'json', ['groups' => 'getCategories']);
        return new JsonResponse($jsonCategory, 200, ['accept' => 'json'], true);
    }

    #[Route('/api/categories', name: 'createCategory', methods: ['POST'])]
    public function createCategory(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, ValidatorInterface $validator): JsonResponse
    {
        $category = $serializer->deserialize($request->getContent(), Category::class, 'json');

        $errors = $validator->validate($category);

        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), 400, [], true);
        }

        $em->persist($category);
        $em->flush();

        $jsonCategory = $serializer->serialize($category, 'json', ['groups' => 'getCategories']);
        $location = $urlGenerator->generate('detailCategory', ['id' => $category->getId()], UrlGeneratorInterface::ABSOLUTE_URL);

        return new JsonResponse($jsonCategory, 201, ['Location' => $location], true);
    }

    #[Route('/api/categories/{id}', name: 'updateCategory', methods: ['PUT'])]
    public function updateCategory(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, Category $currentCategory): JsonResponse
    {
        $updateCategory = $serializer->deserialize($request->getContent(), Category::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $currentCategory]);
        $em->persist($updateCategory);
        $em->flush();

        return new JsonResponse(null, 204);
    }

    #[Route('/api/categories/{id}', name: 'deleteCategory', methods: ['DELETE'])]
    public function deleteCategory(EntityManagerInterface $em, Category $currentCategory): JsonResponse
    {
        $em->remove($currentCategory);
        $em->flush();

        return new JsonResponse('Category deleted', 200, []);
    }

}
