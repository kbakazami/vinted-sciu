<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['getArticles', 'getArticlesByUser', 'getUsers', 'getServicesByUser'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['getUsers'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['getUsers'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getUsers'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getUsers'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $picture = null;

    #[ORM\Column]
    #[Groups(['getUsers'])]
    private ?bool $isFirstActive = null;

    #[ORM\Column]
    #[Groups(['getUsers'])]
    private ?bool $isActive = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Article::class)]
    #[Groups(['getArticlesByUser'])]
    private Collection $articles;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Service::class)]
    #[Groups(['getServicesByUser'])]
    private Collection $services;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[Groups(['getUsers'])]
    private ?Ecole $ecole = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[Groups(['getUsers'])]
    private ?Promo $promo = null;

    #[ORM\Column(nullable: true)]
    private ?int $beecoins = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $activationDate = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isSchoolAdministrator = null;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->services = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): static
    {
        $this->picture = $picture;

        return $this;
    }

    public function isIsFirstActive(): ?bool
    {
        return $this->isFirstActive;
    }

    public function setIsFirstActive(bool $isFirstActive): static
    {
        $this->isFirstActive = $isFirstActive;

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

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): static
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->setUser($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): static
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getUser() === $this) {
                $article->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setUser($this);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getUser() === $this) {
                $service->setUser(null);
            }
        }

        return $this;
    }

    public function getEcole(): ?Ecole
    {
        return $this->ecole;
    }

    public function setEcole(?Ecole $ecole): static
    {
        $this->ecole = $ecole;

        return $this;
    }

    public function getPromo(): ?Promo
    {
        return $this->promo;
    }

    public function setPromo(?Promo $promo): static
    {
        $this->promo = $promo;

        return $this;
    }

    public function getBeecoins(): ?int
    {
        return $this->beecoins;
    }

    public function setBeecoins(?int $beecoins): static
    {
        $this->beecoins = $beecoins;

        return $this;
    }

    public function getActivationDate(): ?\DateTimeInterface
    {
        return $this->activationDate;
    }

    public function setActivationDate(?\DateTimeInterface $activationDate): static
    {
        $this->activationDate = $activationDate;

        return $this;
    }

    public function isIsSchoolAdministrator(): ?bool
    {
        return $this->isSchoolAdministrator;
    }

    public function setIsSchoolAdministrator(bool $isSchoolAdministrator): static
    {
        $this->isSchoolAdministrator = $isSchoolAdministrator;

        return $this;
    }
}
