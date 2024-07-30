<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/user')]
    public function receiveCookie(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $cookieValue = $data['cookieValue'] ?? 'No cookie';

        if ($cookieValue === 'yes') {
            return new Response("OUAIS MA GUEULE");
        }

        return new Response("mon FUCKING cookie : $cookieValue");
    }
}