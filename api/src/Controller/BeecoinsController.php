<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class BeecoinsController extends AbstractController
{
    #[Route('/api/beecoins/buy', name: 'buy', methods: ['PUT'])]
    public function buy(Request $request, SerializerInterface $serializer): JsonResponse
    {
//        $data = $request->toArray();
    }
}
