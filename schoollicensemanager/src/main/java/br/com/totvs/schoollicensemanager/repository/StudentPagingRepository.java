package br.com.totvs.schoollicensemanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.com.totvs.schoollicensemanager.model.Student;

@Repository
public interface StudentPagingRepository extends PagingAndSortingRepository<Student, Long> {
	
	Page<Student> findAllByOrderByEnrollment(Pageable pageable);
	
	Page<Student> findByNameContainingIgnoreCase(String name, Pageable pageable);
	
}
