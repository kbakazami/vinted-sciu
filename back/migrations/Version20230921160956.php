<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230921160956 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mutual_help ADD mutual_attributes_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE mutual_help ADD CONSTRAINT FK_682F7AF8D6B8A9F1 FOREIGN KEY (mutual_attributes_id) REFERENCES mutual_attributes (id)');
        $this->addSql('CREATE INDEX IDX_682F7AF8D6B8A9F1 ON mutual_help (mutual_attributes_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mutual_help DROP FOREIGN KEY FK_682F7AF8D6B8A9F1');
        $this->addSql('DROP INDEX IDX_682F7AF8D6B8A9F1 ON mutual_help');
        $this->addSql('ALTER TABLE mutual_help DROP mutual_attributes_id');
    }
}
