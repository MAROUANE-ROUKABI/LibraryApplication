package ma.gov.mega.Library;

import jakarta.persistence.criteria.Predicate;
import ma.gov.mega.Library.dtos.LivreFilter;
import ma.gov.mega.Library.entities.Livre;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class LivreSpecification {

    public static Specification<Livre> filter(LivreFilter filter) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (filter.getAuteurId() != null) {
                predicates.add(cb.equal(root.get("auteur").get("id"), filter.getAuteurId()));
            }

            if (filter.getEditeurId() != null) {
                predicates.add(cb.equal(root.get("editeur").get("id"), filter.getEditeurId()));
            }

            if (filter.getCategory() != null) {
                predicates.add(cb.equal(root.get("categorie"), filter.getCategory()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}