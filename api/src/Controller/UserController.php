<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
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
}
