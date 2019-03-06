package br.com.totvs.schoollicensemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.totvs.schoollicensemanager.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{

}
