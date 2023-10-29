<?php

namespace App\Controller;

use App\Entity\Gallery;
use App\Repository\ArticleRepository;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class GalleryController extends AbstractController
{
    #[Route('/api/gallery', name: 'addGallery', methods: ['POST'])]
    public function addGallery(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em, ArticleRepository $articleRepository, ServiceRepository $serviceRepository): JsonResponse
    {
        $gallery = $serializer->deserialize($request->getContent(), Gallery::class, 'json');

        $errors = $validator->validate($gallery);

        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), 400, [], true);
        }

        $content = $request->toArray();

        $idArticle = $content['idArticle'] ?? -1;
        $idService = $content['idService'] ?? -1;

        $gallery->setArticle($articleRepository->find($idArticle));
        $gallery->setService($serviceRepository->find($idService));

        $em->persist($gallery);
        $em->flush();

        return new JsonResponse('Image ajoutée', 200, [], true);

    }

    #[Route('/api/gallery/{id}', name: 'deleteGallery', methods: ['DELETE'])]
    public function deleteGallery(Gallery $gallery, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($gallery);
        $em->flush();

        return new JsonResponse('Image supprimée', 200, [], true);
    }
}
