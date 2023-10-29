<?php

namespace App\Controller;

use App\Entity\Ecole;
use App\Repository\EcoleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class EcoleController extends AbstractController
{
    #[Route('/api/ecoles', name: 'getEcoles', methods: ['GET'])]
    public function getEcoles(SerializerInterface $serializer, EcoleRepository $ecoleRepository): JsonResponse
    {
        $ecoles = $ecoleRepository->findAll();
        $jsonEcoles = $serializer->serialize($ecoles, 'json', ['groups' => 'getEcoles']);
        return new JsonResponse($jsonEcoles, 200, [], true);
    }

    #[Route('/api/ecoles/{id}', name: 'getEcole', methods: ['GET'])]
    public function getEcole(SerializerInterface $serializer, EcoleRepository $ecoleRepository, int $id): JsonResponse
    {
        $ecole = $ecoleRepository->find($id);
        $jsonEcole = $serializer->serialize($ecole, 'json', ['groups' => 'getEcoles']);
        return new JsonResponse($jsonEcole, 200, [], true);
    }

    #[Route('/api/ecoles', name: 'addEcole', methods: ['POST'])]
    public function addEcole(Request $request, ValidatorInterface $validator, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $ecole = $serializer->deserialize($request->getContent(), Ecole::class, 'json');

        $errors = $validator->validate($ecole);

        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), 400, [], true);
        }

        $em->persist($ecole);
        $em->flush();

        return new JsonResponse('Ecole ajoutée', 200, [], true);
    }

    #[Route('/api/ecoles/{id}', name: 'updateEcole', methods: ['PUT'])]
    public function updateEcole(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em, Ecole $currentEcole): JsonResponse
    {
        $ecoleUpdate = $serializer->deserialize($request->getContent(), Ecole::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $currentEcole] );

        $errors = $validator->validate($ecoleUpdate);

        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), 400, [], true);
        }

        $em->persist($ecoleUpdate);
        $em->flush();

        return new JsonResponse('Ecole modifiée', 200, [], true);
    }

    #[Route('/api/ecoles/{id}', name: 'deleteEcole', methods: ['DELETE'])]
    public function deleteEcole(Ecole $ecole, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($ecole);
        $em->flush();

        return new JsonResponse('Ecole supprimée', 200, [], true);
    }
}
