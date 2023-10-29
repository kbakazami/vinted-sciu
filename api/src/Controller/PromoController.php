<?php

namespace App\Controller;

use App\Entity\Promo;
use App\Repository\PromoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PromoController extends AbstractController
{
    #[Route('/api/promos', name: 'getPromos', methods: ['GET'])]
    public function getPromos(PromoRepository $promoRepository, SerializerInterface $serializer): JsonResponse
    {
        $promos = $promoRepository->findAll();
        $jsonPromos = $serializer->serialize($promos, 'json', ['groups' => 'getPromos']);
        return new JsonResponse($jsonPromos, 200, [], true);
    }

    #[Route('/api/promos/{id}', name: 'getPromo', methods: ['GET'])]
    public function getPromo(Promo $promo, SerializerInterface $serializer): JsonResponse
    {
        $jsonPromo = $serializer->serialize($promo, 'json', ['groups' => 'getPromos']);
        return new JsonResponse($jsonPromo, 200, [], true);
    }

    #[Route('/api/promos', name: 'addPromo', methods: ['POST'])]
    public function addPromo(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em): JsonResponse
    {
        $promo = $serializer->deserialize($request->getContent(), Promo::class, 'json');

        $errors = $validator->validate($promo);

        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), 400, [], true);
        }

        $em->persist($promo);
        $em->flush();

        return new JsonResponse('Promo ajoutée', 200, [], true);
    }

    #[Route('/api/promos/{id}', name: 'updatePromo', methods: ['PUT'])]
    public function updatePromo(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em, Promo $currentPromo): JsonResponse
    {
        $promoUpdate = $serializer->deserialize($request->getContent(), Promo::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $currentPromo] );

        $errors = $validator->validate($promoUpdate);

        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), 400, [], true);
        }

        $em->persist($promoUpdate);
        $em->flush();

        return new JsonResponse('Promo modifiée', 200, [], true);
    }

    #[Route('/api/promos/{id}', name: 'deletePromo', methods: ['DELETE'])]
    public function deletePromo(Promo $promo, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($promo);
        $em->flush();

        return new JsonResponse('Promo supprimée', 200, [], true);
    }
}
