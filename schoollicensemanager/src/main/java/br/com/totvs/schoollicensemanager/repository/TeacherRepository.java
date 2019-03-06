package br.com.totvs.schoollicensemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.totvs.schoollicensemanager.model.Teacher;

@Repository	
public interface TeacherRepository extends JpaRepository<Teacher, Long>{

}
