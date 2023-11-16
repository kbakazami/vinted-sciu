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
    #[Route('/api/beecoins/buyArticle/{idUser}', name: 'buyArticle', methods: ['PATCH'])]
    public function buyArticle(SerializerInterface $serializer, UserRepository $userRepository, $idUser, EntityManagerInterface $em): JsonResponse
    {
        // take the current user
        $currentUser = $this->getUser();

        // take the seller
        $seller = $userRepository->find($idUser);

        // Check if the current user has enough beecoins
        if(($currentUser->getBeecoins() <= 5 && $currentUser->isIsSchoolAdministrator()) || ($currentUser->getBeecoins() <= 2 && !$currentUser->isIsSchoolAdministrator())) {
            return new JsonResponse("Vous n'avez pas asssez de Beecoins", 403);
        }

        // Give the beecoins to the seller and take them from the current user
        if($currentUser->isIsSchoolAdministrator()) {
            $currentUser->setBeecoins($currentUser->getBeecoins() - 5);
            if ($seller->isIsSchoolAdministrator()){
                $seller->setBeecoins($seller->getBeecoins() + 1);
            } else {
                $seller->setBeecoins($seller->getBeecoins() + 2);
            }

        } else {
            $currentUser->setBeecoins($currentUser->getBeecoins() - 2);
            $seller->setBeecoins($seller->getBeecoins() + 2);
        }

        $em->persist($currentUser);
        $em->persist($seller);
        $em->flush();

        return new JsonResponse(null, 204);
    }

    #[Route('/api/beecoins/buyService/{idUser}', name: 'buyService', methods: ['PATCH'])]
    public function buyService(SerializerInterface $serializer, UserRepository $userRepository, $idUser, EntityManagerInterface $em): JsonResponse
    {
        // take the current user
        $currentUser = $this->getUser();

        // take the seller
        $seller = $userRepository->find($idUser);

        if($currentUser->isIsSchoolAdministrator()) {
            return new JsonResponse("Vous n'êtes pas un étudiant", 403);
        }

        // TODO: reservation feature


        return new JsonResponse(null, 204);
    }


}
