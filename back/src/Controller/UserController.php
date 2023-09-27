<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    public function __construct
    (
        private readonly EntityManagerInterface $entityManager,
    )
    {}

    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, SerializerInterface $serializer): JsonResponse
    {
        try{
            $content = $request->getContent();
            $data = json_decode($content, true);
            $user = $serializer->denormalize($data, User::class);
            $user->setPassword(password_hash($data['password'], PASSWORD_DEFAULT));
            $this->entityManager->persist($user);
            $this->entityManager->flush();


            return $this->json('User registered', 201);
        } catch (\Exception $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
}
