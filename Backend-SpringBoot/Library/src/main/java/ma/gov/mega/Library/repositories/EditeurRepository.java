package ma.gov.mega.Library.repositories;

import ma.gov.mega.Library.entities.Editeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EditeurRepository extends JpaRepository<Editeur, Long> {
}
