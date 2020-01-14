---
layout  : wiki
title   : Cache란?
summary : 
date    : 2020-01-14 01:28:57 +0900
updated : 2020-01-14 11:46:08 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}


## 캐시란?

- 캐시란 데이터를 임시로 저장해두는 장소
- 빠른 접근성을 제공해 불필요한 수행을 줄여준다.
- 어떤 경우에도 원하는 데이터에 직접 접근하거나 만들어내는 비용보다 저렴해야 한다.

## 캐시의 용어

- origin : 실제 데이터가 존재하는 공간
- cache expire : 캐시의 유효기간. 시간이 지나면 Stale 상태가 된다.
- fresh cache : 만료되지 않은 캐시
- stale cache : 만료된 캐시
- cache hit : 참조하려는 데이터가 캐시에 존재할 때 조회하는 것
- cache miss : 참조하려는 데이터가 존재하지 않는 경우
- cache read : 키를 이용해 캐시에 접근하고 캐시에 존재하지 않는다면 origin에서 데이터를 가져오고 저장한다.
- cache write(Write Through 방식) : 캐시에 데이터를 먼저 업데이트하고 origin을 즉시 업데이트한다. (이 외에 여러 방식이 있음)

## 캐시의 교체 방식

- LRU(Least Recently Used) : 가장 오랫동안 사용되지 않은 캐시가 교체된다. 일반적으로 사용되는 방식
- MRU(Most Recently Used) : 가장 최근에 많이 사용된 캐시를 순서로 교체한다.

## LinkedHashMap을 이용한 LRU Cache 구현

- LinkedHashMap은 HashMap에 순서를 추가한 것이다.

```java
import java.util.HashMap;
import java.util.Map;

public class LRUCache {

	public static final int CAPACITY = 4;

	private int actualSize;
	private Map<Integer, Node> map;
	private DoublyLinkedList linkedList;

	public LRUCache() {
		this.map = new HashMap<>();
		this.linkedList = new DoublyLinkedList();
	}

	static class Node {

		private int id;
		private String data;
		private Node prevNode;
		private Node nextNode;
		
		public Node() {
			
		}

		public Node(int id, String data) {
			this.id = id;
			this.data = data;
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getData() {
			return data;
		}

		public void setData(String data) {
			this.data = data;
		}

		public Node getPrevNode() {
			return prevNode;
		}

		public void setPrevNode(Node prevNode) {
			this.prevNode = prevNode;
		}

		public Node getNextNode() {
			return nextNode;
		}

		public void setNextNode(Node nextNode) {
			this.nextNode = nextNode;
		}

		@Override
		public String toString() {
			return "Node [id=" + id + ", data=" + data + "]";
		}
	}

	static class DoublyLinkedList {
		private Node headNode;
		private Node tailNode;

		public Node getHeadNode() {
			return headNode;
		}

		public void setHeadNode(Node headNode) {
			this.headNode = headNode;
		}

		public Node getTailNode() {
			return tailNode;
		}

		public void setTailNode(Node tailNode) {
			this.tailNode = tailNode;
		}

	}

	private void add(Node newNode) {

		newNode.setNextNode(this.linkedList.getHeadNode());
		newNode.setPrevNode(null);

		if (linkedList.getHeadNode() != null) {
			linkedList.getHeadNode().setPrevNode(newNode);
		}

		linkedList.setHeadNode(newNode);

		if (linkedList.getTailNode() == null) {
			linkedList.setTailNode(newNode);
		}

		this.map.put(newNode.getId(), newNode);

	}

	private void update(Node node) {

		Node prevNode = node.getPrevNode();
		Node nextNode = node.getNextNode();

		if (prevNode != null) {
			prevNode.setNextNode(nextNode);
		} else { // head 노드인 경우
			this.linkedList.setHeadNode(nextNode); // 다음노드를 head 노드로 세팅
		}

		if (nextNode != null) {
			nextNode.setPrevNode(prevNode);
		} else { // tail 노드인 경우
			this.linkedList.setTailNode(prevNode); // tail 노드를 이전노드로 변경
		}

		add(node);
	}

	private void removeTail() {

		Node lastNode = this.map.get(this.linkedList.getTailNode().getId());

		this.linkedList.setTailNode(linkedList.getTailNode().getPrevNode());

		if (this.linkedList.getTailNode() != null) {
			this.linkedList.getTailNode().setNextNode(null);
		}

		lastNode = null; 
	}

	public void put(int id, String data) {

		if (map.containsKey(id)) {
			Node node = this.map.get(id);
			node.setData(data);
			update(node);
			return;
		}

		Node newNode = new Node(id, data);

		if (this.actualSize < CAPACITY) {
			this.actualSize++;
			add(newNode); // 삽입
		} else { 
			System.out.println("cache is full... remove tail");
			removeTail(); // 마지막 노드 제거
			add(newNode); // 삽입
		}
	}

	public Node get(int id) {

		if (!this.map.containsKey(id)) {
			return null;
		}

		Node node = this.map.get(id);
		update(node);
		return node;
	}

	public void show() {
		Node actualNode = this.linkedList.getHeadNode();
		while (actualNode != null) {
			System.out.print(actualNode + " <--> ");
			actualNode = actualNode.getNextNode();
		}
		System.out.println();
	}

	public static void main(String[] args) {
		LRUCache cache = new LRUCache();

		cache.put(0, "A");
		cache.show();
		cache.put(1, "B");
		cache.show();
		cache.put(2, "C");
		cache.show();
		cache.put(3, "D");
		cache.show();

		cache.put(4, "E");
		cache.show();

		cache.put(5, "F");
		cache.show();

		cache.put(6, "G");
		cache.show();

		System.out.println(cache.get(6));
		cache.show();

		System.out.println(cache.get(3));
		cache.show();

		System.out.println(cache.get(4));
		cache.show();
	}

}
```


## 출처
- [Cache에 대한 이론적인 정리](https://jins-dev.tistory.com/entry/Cache-%EC%97%90-%EB%8C%80%ED%95%9C-%EC%9D%B4%EB%A1%A0%EC%A0%81%EC%9D%B8-%EC%A0%95%EB%A6%AC)
- 
