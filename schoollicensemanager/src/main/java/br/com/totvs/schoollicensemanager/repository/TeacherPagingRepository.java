package br.com.totvs.schoollicensemanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.com.totvs.schoollicensemanager.model.Teacher;

@Repository
public interface TeacherPagingRepository extends PagingAndSortingRepository<Teacher, Long> {
	
	Page<Teacher> findAllByOrderById(Pageable pageable);
	
	Page<Teacher> findByNameContainingIgnoreCase(String name, Pageable pageable);
	
}
