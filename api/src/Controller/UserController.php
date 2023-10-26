<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\EcoleRepository;
use App\Repository\PromoRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em): JsonResponse
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');

        $error = $validator->validate($user);

        if (count($error) > 0) {
            return new JsonResponse($serializer->serialize($error, 'json'), 400, [], true);
        }

        $content = $request->toArray();
        $passwordHash = password_hash($content['password'], PASSWORD_DEFAULT);
        $user->setPassword($passwordHash);
        $user->setIsActive(false);
        $user->setRoles(['ROLE_USER']);
        $user->setIsFirstActive(false);

        $em->persist($user);
        $em->flush();

        return new JsonResponse($serializer->serialize($user, 'json'), 201, [], true);

    }

    #[Route('/api/users/{id}/articles', name: 'articlesByUsers', methods: ['GET'])]
    public function getUserArticles(User $user, SerializerInterface $serializer): JsonResponse
    {
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getArticlesByUser']);
        return new JsonResponse($jsonUser, 200, [], true);
    }

    #[Route('/api/users/{id}/services', name: 'servicesByUsers', methods: ['GET'])]
    public function getUserServices(User $user, SerializerInterface $serializer): JsonResponse
    {
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getServicesByUser']);
        return new JsonResponse($jsonUser, 200, [], true);
    }

    #[Route('/api/users', name: 'users', methods: ['GET'])]
    public function getUserList(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $userList = $userRepository->findAll();
        $jsonUserList = $serializer->serialize($userList, 'json', ['groups' => 'getUsers']);
        return new JsonResponse($jsonUserList, 200, [], true);
    }

    #[Route('/api/users/{id}', name: 'detailUser', methods: ['GET'])]
    public function getDetailUser(User $user, SerializerInterface $serializer): JsonResponse
    {
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUsers']);
        return new JsonResponse($jsonUser, 200, [], true);
    }

    #[Route('/api/currentUser', name: 'currentUser', methods: ['GET'])]
    public function getCurrentUser(SerializerInterface $serializer): JsonResponse
    {
        $user = $this->getUser();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUsers']);
        return new JsonResponse($jsonUser, 200, [], true);
    }

    #[Route('/api/users/{id}', name: 'deleteUser', methods: ['DELETE'])]
    public function deleteUser(User $user, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($user);
        $em->flush();
        return new JsonResponse(null, 204);
    }

    #[Route('/api/users/{id}', name: 'updateUser', methods: ['PUT'])]
    public function updateUser(User $currentUser,  Request $request, SerializerInterface $serializer, EntityManagerInterface $em, EcoleRepository $ecoleRepository, PromoRepository $promoRepository)
    {
        $updateUser = $serializer->deserialize($request->getContent(), User::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $currentUser]);

        $content = $request->toArray();

        $idPromo = $content['idPromo'] ?? -1;
        $idEcole = $content['idEcole'] ?? -1;

        $updateUser->setPromo($promoRepository->find($idPromo));
        $updateUser->setEcole($ecoleRepository->find($idEcole));

        $em->persist($updateUser);
        $em->flush();

        return new JsonResponse(null, 204);
    }
}
