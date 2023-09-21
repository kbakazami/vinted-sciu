<?php

namespace App\Repository;

use App\Entity\MutualAttributes;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MutualAttributes>
 *
 * @method MutualAttributes|null find($id, $lockMode = null, $lockVersion = null)
 * @method MutualAttributes|null findOneBy(array $criteria, array $orderBy = null)
 * @method MutualAttributes[]    findAll()
 * @method MutualAttributes[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MutualAttributesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MutualAttributes::class);
    }

//    /**
//     * @return MutualAttributes[] Returns an array of MutualAttributes objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MutualAttributes
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
