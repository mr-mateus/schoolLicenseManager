package br.com.totvs.schoollicensemanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.com.totvs.schoollicensemanager.model.Discipline;

@Repository
public interface DisciplinePagingRepository extends PagingAndSortingRepository<Discipline, Long>{
	Page<Discipline> findAllByOrderById(Pageable pageable);

	Page<Discipline> findByInitialsContainingIgnoreCase(String initials, Pageable pageable);
}
