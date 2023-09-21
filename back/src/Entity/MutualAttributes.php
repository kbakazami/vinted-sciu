<?php

namespace App\Entity;

use App\Repository\MutualAttributesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MutualAttributesRepository::class)]
class MutualAttributes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['items:read'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'MutualAttributes', targetEntity: MutualHelp::class)]
    private Collection $mutualHelps;

    public function __construct()
    {
        $this->mutualHelps = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, MutualHelp>
     */
    public function getMutualHelps(): Collection
    {
        return $this->mutualHelps;
    }

    public function addMutualHelp(MutualHelp $mutualHelp): static
    {
        if (!$this->mutualHelps->contains($mutualHelp)) {
            $this->mutualHelps->add($mutualHelp);
            $mutualHelp->setMutualAttributes($this);
        }

        return $this;
    }

    public function removeMutualHelp(MutualHelp $mutualHelp): static
    {
        if ($this->mutualHelps->removeElement($mutualHelp)) {
            // set the owning side to null (unless already changed)
            if ($mutualHelp->getMutualAttributes() === $this) {
                $mutualHelp->setMutualAttributes(null);
            }
        }

        return $this;
    }

    public function __toString(): string
    {
        return $this->getName();
    }
}
