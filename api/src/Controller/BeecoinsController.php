<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class BeecoinsController extends AbstractController
{
    #[Route('/api/beecoins/buy/{idUser}', name: 'buy', methods: ['PATCH'])]
    public function buy(Request $request, SerializerInterface $serializer, UserRepository $userRepository, $idUser, EntityManagerInterface $em): JsonResponse
    {
        // take the current user
        $currentUser = $this->getUser();

        // take the seller
        $seller = $userRepository->find($idUser);

        // take the content of the request
        $content = $request->toArray();

        $currentUser->setBeecoins($currentUser->getBeecoins() - $content['beecoins']);
        $seller->setBeecoins($seller->getBeecoins() + $content['beecoins']);

        $em->persist($currentUser);
        $em->persist($seller);
        $em->flush();

        return new JsonResponse(null, 204);
    }
}
