package br.com.totvs.schoollicensemanager.model;

import java.util.List;

import org.springframework.data.domain.Page;

public class PageResponseEntity<K> {
	
	private boolean hasNext;
	private List<K> items;
	public PageResponseEntity(Page<K> page) {
		this.hasNext = page.hasNext();
		this.items = page.getContent();
	}
	public boolean isHasNext() {
		return hasNext;
	}

	public List<K> getItems() {
		return items;
	}

	
	
	

}
