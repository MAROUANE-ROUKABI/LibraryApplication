package ma.gov.mega.Library.repositories;

import ma.gov.mega.Library.entities.Auteur;
import ma.gov.mega.Library.entities.Category;
import ma.gov.mega.Library.entities.Editeur;
import ma.gov.mega.Library.entities.Livre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LivreRepository extends JpaRepository<Livre, Long>,JpaSpecificationExecutor<Livre> {


}
