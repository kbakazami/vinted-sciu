<?php

namespace App\Entity;

use App\Repository\MutualHelpRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MutualHelpRepository::class)]
class MutualHelp
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['items:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['items:read'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['items:read'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'mutualHelps')]
    #[Groups(['items:read'])]
    private ?MutualAttributes $MutualAttributes = null;

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

    public function getMutualAttributes(): ?MutualAttributes
    {
        return $this->MutualAttributes;
    }

    public function setMutualAttributes(?MutualAttributes $MutualAttributes): static
    {
        $this->MutualAttributes = $MutualAttributes;

        return $this;
    }
}
