<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CookieController extends AbstractController
{
    #[Route('/set-cookie')]
    public function setCookie(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $cookieValue = $data['username'] ?? 'no username';

        $response = new Response();
        $response->headers->setCookie(new Cookie(
            'username',
            $cookieValue,
            time() + 3600,
            '/',
            null,
            false,
            true,
            false
        ));
        
        $response->setContent('Cookie has been set. Cookie value: ' . $cookieValue);
        return $response;
    }
}
