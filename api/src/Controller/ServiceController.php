<?php

namespace App\Controller;

use App\Entity\Service;
use App\Repository\CategoryRepository;
use App\Repository\ServiceCategoryRepository;
use App\Repository\ServiceRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ServiceController extends AbstractController
{
    #[Route('/api/services', name: 'services', methods: ['GET'])]
    public function getServiceList(ServiceRepository $serviceRepository, SerializerInterface $serializer): JsonResponse
    {
        $serviceList = $serviceRepository->findAll();
        $jsonServiceList = $serializer->serialize($serviceList, 'json', ['groups' => 'getServices']);
        return new JsonResponse($jsonServiceList, 200, [], true);
    }

    #[Route('/api/services/{id}', name: 'detailService', methods: ['GET'])]
    public function getDetailService(Service $service, SerializerInterface $serializer): JsonResponse
    {
        $jsonService = $serializer->serialize($service, 'json', ['groups' => 'getServices']);
        return new JsonResponse($jsonService, 200, ['accept' => 'json'], true);
    }

    #[Route('/api/services', name: 'createService', methods: ['POST'])]
    public function createService(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, ServiceCategoryRepository $categoryRepository, ValidatorInterface $validator, UserRepository $userRepository): JsonResponse
    {
       $service = $serializer->deserialize($request->getContent(), Service::class, 'json');

       $errors = $validator->validate($service);

       if (count($errors) > 0) {
           return new JsonResponse($serializer->serialize($errors, 'json'), 400, [], true);
       }

       $service->setIsActive(false);
       $content = $request->toArray();

       $idServiceCategory = $content['idServiceCategory'] ?? -1;
       $idUser = $content['idUser'] ?? -1;


       $service->setServiceCategory($categoryRepository->find($idServiceCategory));
       $service->setUser($userRepository->find($idUser));



       $em->persist($service);
       $em->flush();

       $jsonService = $serializer->serialize($service, 'json', ['groups' => 'getServices']);
       return new JsonResponse($jsonService, 201, ['Location' => $urlGenerator->generate('detailService', ['id' => $service->getId()])], true);
    }

    #[Route('/api/services/{id}', name: 'updateService', methods: ['PUT'])]
    public function updateService(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, ServiceCategoryRepository $categoryRepository, ValidatorInterface $validator, UserRepository $userRepository, Service $currentService): JsonResponse
    {
        $updateService = $serializer->deserialize($request->getContent(), Service::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $currentService]);

        $content = $request->toArray();

        $idServiceCategory = $content['idServiceCategory'] ?? -1;

        $updateService->setServiceCategory($categoryRepository->find($idServiceCategory));

        $em->persist($updateService);
        $em->flush();

        return new JsonResponse(null, 204);

    }

    #[Route('/api/services/{id}', name: 'deleteService', methods: ['DELETE'])]
    public function deleteService(Service $service, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($service);
        $em->flush();

        return new JsonResponse(null, 204);
    }

#[Route('/api/services/{id}/activate', name: 'activateService', methods: ['PUT'])]
    public function activateService(Service $service, EntityManagerInterface $em): JsonResponse
    {
        $service->setIsActive(true);
        $em->persist($service);
        $em->flush();

        return new JsonResponse(null, 204);
    }

    #[Route('/api/services/{id}/deactivate', name: 'deactivateService', methods: ['PUT'])]
    public function deactivateService(Service $service, EntityManagerInterface $em): JsonResponse
    {
        $service->setIsActive(false);
        $em->persist($service);
        $em->flush();

        return new JsonResponse(null, 204);
    }
}
