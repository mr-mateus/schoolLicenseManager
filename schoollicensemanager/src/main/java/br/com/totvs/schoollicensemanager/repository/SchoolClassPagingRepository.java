package br.com.totvs.schoollicensemanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.com.totvs.schoollicensemanager.model.SchoolClass;

@Repository
public interface SchoolClassPagingRepository extends PagingAndSortingRepository<SchoolClass, Long>{
	Page<SchoolClass> findAllByOrderById(Pageable pageable);

	Page<SchoolClass> findByDescriptionContainingIgnoreCase(String description, Pageable pageable);
}
