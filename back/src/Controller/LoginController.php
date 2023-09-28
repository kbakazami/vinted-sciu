<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Serializer\SerializerInterface;

class LoginController extends AbstractController
{
    public function __construct
    (
        private readonly EntityManagerInterface $entityManager,
    )
    {}

    #[Route('/', name: 'app_login_admin')]
    public function index(AuthenticationUtils $authenticationUtils): Response
    {
        $error = $authenticationUtils->getLastAuthenticationError();

        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('login/index.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error
        ]);
    }

    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user, JWTTokenManagerInterface $JWTTokenManager): Response
    {
      if (null === $user) {
          return $this->json([
              'message' => 'Missing credentials'
          ], Response::HTTP_UNAUTHORIZED);
      }

      $token = $JWTTokenManager->create($user);

      return $this->json([
          'user' => $user->getUserIdentifier(),
          'token' => $token
      ]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(): never
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

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
