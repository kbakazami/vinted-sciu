<?php

namespace App\Controller;

use App\Entity\ServiceCategory;
use App\Repository\ServiceCategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ServiceCategoryController extends AbstractController
{
    #[Route('/api/servicesCategories', name: 'serviceCategory', methods: ['GET'])]
    public function getServiceCategory(ServiceCategoryRepository $serviceCategoryRepository, SerializerInterface $serializer): JsonResponse
    {
        $serviceCategoryList = $serviceCategoryRepository->findAll();
        $jsonServiceCategoryList = $serializer->serialize($serviceCategoryList, 'json', ['groups' => 'getServicesCategories']);
        return new JsonResponse($jsonServiceCategoryList, 200, [], true);
    }

    #[Route('/api/servicesCategories/{id}', name: 'detailServiceCategory', methods: ['GET'])]
    public function getDetailServiceCategory(ServiceCategory $serviceCategory, SerializerInterface $serializer): JsonResponse
    {
        $jsonServiceCategory = $serializer->serialize($serviceCategory, 'json', ['groups' => 'getServicesCategories']);
        return new JsonResponse($jsonServiceCategory, 200, ['accept' => 'json'], true);
    }

    #[Route('/api/servicesCategories/{id}/services', name: 'ServiceCategoryByService', methods: ['GET'])]
    public function getServicesByServiceCategory(ServiceCategoryRepository $serviceCategoryRepository, SerializerInterface $serializer, int $id): JsonResponse
    {
        $serviceCategory = $serviceCategoryRepository->find($id);
        $jsonServiceCategory = $serializer->serialize($serviceCategory, 'json', ['groups' => 'getServicesCategories']);
        return new JsonResponse($jsonServiceCategory, 200, [], true);
    }

    #[Route('/api/servicesCategories', name: 'createServiceCategory', methods: ['POST'])]
    public function createServiceCategory(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ): JsonResponse
    {
        $serviceCategory = $serializer->deserialize($request->getContent(), ServiceCategory::class, 'json');
        $em->persist($serviceCategory);
        $em->flush();
        return new JsonResponse(
            'ServiceCategory created',
            201,
            ['location' => $this->generateUrl('detailServiceCategory', ['id' => $serviceCategory->getId(), UrlGeneratorInterface::ABSOLUTE_URL])]
        );
    }

    #[Route('/api/servicesCategories/{id}', name: 'updateServiceCategory', methods: ['PUT'])]
    public function updateServiceCategory(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ServiceCategory $serviceCategory): JsonResponse
    {
        $serializer->deserialize($request->getContent(), ServiceCategory::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $serviceCategory]);

        $em->flush();
        return new JsonResponse('ServiceCategory updated', 200, []);
    }

    #[Route('/api/servicesCategories/{id}', name: 'deleteServiceCategory', methods: ['DELETE'])]
    public function deleteServiceCategory(EntityManagerInterface $em, ServiceCategory $serviceCategory): JsonResponse
    {
        $em->remove($serviceCategory);
        $em->flush();
        return new JsonResponse('ServiceCategory deleted', 200, []);
    }
}
