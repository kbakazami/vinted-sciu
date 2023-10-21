<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['getArticles', 'getCategories', 'getArticlesByUser'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getArticles', 'getCategories', 'getArticlesByUser'])]
    #[Assert\NotBlank(message: "Le titre du l'article est obligatoire")]
    #[Assert\Length(min: 3, max: 255, minMessage: "Le titre doit faire au moins {{ limit }} caractères", maxMessage: "Le titre doit faire au plus {{ limit }} caractères")]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['getArticles'])]
    #[Assert\NotBlank(message: "La description de l'article est obligatoire")]
    #[Assert\Length(min: 3, max: 255, minMessage: "La description doit faire au moins {{ limit }} caractères", maxMessage: "La description doit faire au plus {{ limit }} caractères")]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[Groups(['getArticles'])]
    private ?Category $category = null;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[Groups(['getArticles'])]
    private ?User $user = null;

    #[ORM\Column]
    #[Groups(['getArticles'])]
    private ?bool $isActive = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function isIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }
}
