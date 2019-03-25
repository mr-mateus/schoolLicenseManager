package br.com.totvs.schoollicensemanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.totvs.schoollicensemanager.model.SchoolClass;

@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {

	Page<SchoolClass> findAllByOrderById(Pageable pageable);

	Page<SchoolClass> findByDescriptionContainingIgnoreCase(String description, Pageable pageable);

}
