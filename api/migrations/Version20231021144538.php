<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231021144538 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ecole (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE promo (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD ecole_id INT DEFAULT NULL, ADD promo_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64977EF1B1E FOREIGN KEY (ecole_id) REFERENCES ecole (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D0C07AFF FOREIGN KEY (promo_id) REFERENCES promo (id)');
        $this->addSql('CREATE INDEX IDX_8D93D64977EF1B1E ON user (ecole_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649D0C07AFF ON user (promo_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64977EF1B1E');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D0C07AFF');
        $this->addSql('DROP TABLE ecole');
        $this->addSql('DROP TABLE promo');
        $this->addSql('DROP INDEX IDX_8D93D64977EF1B1E ON user');
        $this->addSql('DROP INDEX IDX_8D93D649D0C07AFF ON user');
        $this->addSql('ALTER TABLE user DROP ecole_id, DROP promo_id');
    }
}
