<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use App\Repository\CategoryRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ArticleController extends AbstractController
{

    #[Route('/api/articles', name: 'articles', methods: ['GET'])]
    public function getArticleList(ArticleRepository $articleRepository, SerializerInterface $serializer): JsonResponse
    {
        $articleList = $articleRepository->findAll();
        $jsonArticleList = $serializer->serialize($articleList, 'json', ['groups' => 'getArticles']);
        return new JsonResponse($jsonArticleList, 200, [], true);
    }

    #[Route('/api/articles/{id}', name: 'detailArticle', methods: ['GET'])]
    public function getDetailArticle(Article $article, SerializerInterface $serializer): JsonResponse
    {
        $jsonArticle = $serializer->serialize($article, 'json', ['groups' => 'getArticles']);
        return new JsonResponse($jsonArticle, 200, ['accept' => 'json'], true);
    }

    #[Route('/api/articles', name: 'createArticle', methods: ['POST'])]
    public function createArticle(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, CategoryRepository $categoryRepository, ValidatorInterface $validator, UserRepository $userRepository): JsonResponse
    {
       $article = $serializer->deserialize($request->getContent(), Article::class, 'json');

       $errors = $validator->validate($article);

       if (count($errors) > 0) {
           return new JsonResponse($serializer->serialize($errors, 'json'), 400, [], true);
       }

       $article->setIsActive(false);
       $content = $request->toArray();

       $idCategory = $content['idCategory'] ?? -1;
       $idUser = $content['idUser'] ?? -1;


       $article->setCategory($categoryRepository->find($idCategory));
       $article->setUser($userRepository->find($idUser));


       $em->persist($article);
       $em->flush();

       $jsonArticle = $serializer->serialize($article, 'json', ['groups' => 'getArticles']);
       $location = $urlGenerator->generate('detailArticle', ['id' => $article->getId()], UrlGeneratorInterface::ABSOLUTE_URL);

       return new JsonResponse($jsonArticle, 201, ['Location' => $location], true);
    }

    #[Route('/api/articles/{id}', name: 'updateArticle', methods: ['PUT'])]
    public function updateArticle(Article $currentArticle, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, CategoryRepository $categoryRepository): JsonResponse
    {
       $updateArticle = $serializer->deserialize($request->getContent(), Article::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $currentArticle]);

       $content = $request->toArray();

       $idCategory = $content['idCategory'] ?? -1;

       $updateArticle->setCategory($categoryRepository->find($idCategory));

       $em->persist($updateArticle);
       $em->flush();

       return new JsonResponse(null, 204);
    }


    #[Route('/api/articles/{id}', name: 'deleteArticle', methods: ['DELETE'])]
    public function deleteArticle(Article $article, EntityManagerInterface $em): JsonResponse
    {
       $em->remove($article);
       $em->flush();

       return new JsonResponse(null, 204);
    }
}
