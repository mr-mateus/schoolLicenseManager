package br.com.totvs.schoollicensemanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.totvs.schoollicensemanager.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

	boolean existsByEmail(String email);

	
	boolean existsByCpf(String cpf);

	boolean existsByEmailAndEnrollmentIsNotIn(String email, Long enrollment);
	
	boolean existsByCpfAndEnrollmentIsNotIn(String cpf, Long enrollment);

	List<Student> findByNameContainingIgnoreCase(String name);
}
