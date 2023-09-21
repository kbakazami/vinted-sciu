<?php

namespace App\Repository;

use App\Entity\MutualHelp;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MutualHelp>
 *
 * @method MutualHelp|null find($id, $lockMode = null, $lockVersion = null)
 * @method MutualHelp|null findOneBy(array $criteria, array $orderBy = null)
 * @method MutualHelp[]    findAll()
 * @method MutualHelp[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MutualHelpRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MutualHelp::class);
    }

//    /**
//     * @return MutualHelp[] Returns an array of MutualHelp objects
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

//    public function findOneBySomeField($value): ?MutualHelp
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
