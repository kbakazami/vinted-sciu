<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin as Admin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

final class CategoriesAdmin extends Admin
{
    protected function configureShowFields(ShowMapper $show): void
    {
        $show
            ->add('title')
        ;
    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->add('title')
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $filter): void
    {
        $filter
            ->add('title')
        ;
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->add('title')
            ->add('_action', 'actions', [
                'actions' => [
                    'show' => [],
                    'edit' => [],
                    'delete' => [],
                ],
            ]);
        ;
    }
}

