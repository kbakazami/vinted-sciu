<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin as Admin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;


class MutualAttributesAdmin extends Admin
{
    protected function configureShowFields(ShowMapper $show): void
    {
        $show
            ->add('name')
            ->add('description')
        ;
    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->add('name')
            ->add('description')
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $filter): void
    {
        $filter
            ->add('name')
            ->add('description')
        ;
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->add('id')
            ->add('name')
            ->add('description')
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