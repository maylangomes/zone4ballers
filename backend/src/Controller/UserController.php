<?php

namespace App\Controller;

use App\Entity\Login;
use App\Repository\LoginRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class UserController extends AbstractController
{
    private $entityManager;
    private $validator;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        $email = $data['email'] ?? '';

        if (empty($username) || empty($password) || empty($email)) {
            return new JsonResponse(['error' => 'Something is missing'], Response::HTTP_BAD_REQUEST);
        }

        $user = new Login();
        $user->setUsername($username);
        $user->setPassword(password_hash($password, PASSWORD_BCRYPT));
        $user->setEmail($email);
        $user->setCreatedAt(new \DateTimeImmutable());
        $user->setUpdatedAt(new \DateTime());

        $errors = $this->validator->validate($user);

        if (count($errors) > 0) {
            return new JsonResponse(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'User created !'], Response::HTTP_CREATED);
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request, LoginRepository $loginRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($username) || empty($password)) {
            return new JsonResponse(['error' => 'Something is missing'], Response::HTTP_BAD_REQUEST);
        }

        $user = $loginRepository->findOneBy(['username' => $username]);

        if (!$user || !$user->verifyPassword($password)) {
            return new JsonResponse(['error' => 'Email or password incorrect'], Response::HTTP_UNAUTHORIZED);
        }

        // Generate a token or session here if needed
        return new JsonResponse(['message' => 'Welcome !'], Response::HTTP_OK);
    }
}
