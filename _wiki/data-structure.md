---
layout  : wiki
title   : 자료구조를 정리해 놓은 글
summary : 
date    : 2019-08-23 23:47:41 +0900
updated : 2020-01-12 22:08:34 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 자료구조란?

- 데이터를 메모리에 저장할 때 데이터의 순서나 위치 관계 등을 정하는 것
- 자료구조를 목적에 맞게 써서 메모리의 이용 효율을 높여야 한다

## 리스트

- 데이터 검색 시간은 앞에서부터 차례로 계산하기 때문에 O(n). 그러나 데이터 추가와 삭제는 두 개의 포인터만 변경하면 되기 때문에 O(1)이 걸린다.

### 또 다른 리스트

- 마지막 데이터의 포인터를 맨 앞으로 가리키게 하는 원형 리스트
- 각 데이터마다 2개의 포인터를 사용하는 양방향 리스트

## 배열

- 데이터 검색 시간은 인덱스로 바로 가면 되기때문에 O(1). 그러나 데이터 추가와 삭제는 모든 데이터를 옮겨야 하기 때문에 O(n)이 걸린다.

## 스택

- LIFO 구조

## 큐

- FIFO 구조
- 알고리즘을 할 때 매우 유용하게 쓰인다. 예를 들어서 부딫히면 사라진다든지, 누가 누굴 먹어서 사라진다든지 등의 조건이 있을 때 `queue.poll()`하고 그냥 `continue;`하면 된다. 그냥 빼는 것이기 때문에 시간도 짧다.

## 해시테이블

- 데이터를 해시함수에 넣어서 인덱스(Key)를 구하고 그 안에 데이터(Value)을 넣는 방법
- 해시함수는 나머지 연산을 한다든지, 여러 연산을 섞어서 할 수 있다.
- 바로 접근이 가능하기 때문에 시간복잡도는 O(n)이다.
- 인덱스 안에 있는 값을 버켓이라고 하고 해시값에 있는 값을 엔트리라고 한다.
- 그러나 해시함수에 넣어도 똑같은 인덱스가 나올 수 있다. 이것을 **충돌(Collison)**이라고 한다.
- 충돌을 해결하는 두 가지 방법
    - 체이닝(Chaining) : 이미 있는 값 뒤에 리스트 형식으로 계속해서 붙인다.
    - 선형탐사(Linear Probing) : 이미 있는 값이라면 다음 인덱스에 넣는다.
        - 이는 자리가 꽉찰 위험이 있기 때문에 테이블 리사이징(Resizing)이 필요하다.
- 자바에 있는 HashMap과 HashTable의 차이점으로는 동기화를 들 수 있다.
    - HashMap은 동기화를 지원하지 않아 싱글 스레드의 환경에 적합하다.
    - HashTable은 동기화를 지원해 멀티 스레드 환경에 적합하다.

### 체이닝 구현

```java
import java.util.LinkedList;

class HashTable {

	LinkedList<Node>[] data;

	HashTable(int size) {
		this.data = new LinkedList[size];
	}

	static class Node {
		String key;
		String value;

		public Node(String key, String value) {
			this.key = key;
			this.value = value;
		}

		String value() {
			return value;
		}

		void value(String value) {
			this.value = value;
		}
	}

	int getHashCode(String key) {
		int hashcode = 0;
		for (char c : key.toCharArray()) {
			hashcode += c;
		}
		return hashcode;
	}

	int convertToIndex(int hashcode) {
		return hashcode % data.length;
	}

	Node searchKey(LinkedList<Node> list, String key) {
		if (list == null)
			return null;
		for (Node node : list) {
			if (node.key.equals(key)) {
				return node;
			}
		}
		return null;
	}

	void put(String key, String value) {
		int hashcode = getHashCode(key);
		int index = convertToIndex(hashcode);
		System.out.println(key + ", hashcode : " + hashcode + " index : " + index);
		LinkedList<Node> list = data[index];
		if (list == null) {
			list = new LinkedList<Node>();
			data[index] = list;
		}

		Node node = searchKey(list, key);
		if (node == null) {
			list.addLast(new Node(key, value));
		} else {
			node.value(value);
		}
	}

	String get(String key) {
		int hashcode = getHashCode(key);
		int index = convertToIndex(hashcode);
		LinkedList<Node> list = data[index];
		Node node = searchKey(list, key);
		return node == null ? "Not found" : node.value();
	}

}

public class HashTableTest {

	public static void main(String[] args) {
		HashTable h = new HashTable(3);
		h.put("sung", "she is sung");
		h.put("jin", "she is jin");
		h.put("hee", "she is angel");
		h.put("min", "she is cute");
		h.put("sung", "she is efff ");
		System.out.println(h.get("sung"));
		System.out.println(h.get("jin"));
		System.out.println(h.get("hee"));
		System.out.println(h.get("min"));
		System.out.println(h.get("jae"));
	}

}
```

## 힙

- 우선순위 큐를 구현할 때 사용된다
- 데이터의 추가는 자유롭게 하지만 데이터를 꺼내올 때는 최솟값부터 꺼낼 수 있다.
- 트리구조로 추가할 때마다 자식 노드는 부모 노드보다 커야된다는 조건을 만족하기 위에 항상 맨 위에 최솟값이 들어간다.
- 가장 위에 최솟값이 있으므로 O(1)의 시간에 최솟값을 꺼낼 수 있으며 꺼내고 난 뒤에 재구축할 때의 계산시간은 트리의 높이와 비례하므로 O(log n)이 된다.
- 그래서 PriorityQueue를 toString으로 찍어보면 맨 처음이 MIN 또는 MAX인 것을 보장하지만 그 뒤로는 index의 반 만큼 비교해서 swap해주는 것으로 logn * n이라서 nlogn이 된다.

## 이진 탐색 트리

- 왼쪽 가지에는 자기 자신보다 작은 숫자, 오른쪽 가지에는 자기 자신보다 큰 숫자가 들어간다.
- 데이터 탐색이나 추가할 때 트리의 높이만큼 배교해야되므로 O(log n)이 된다.
- 트리가 한 쪽으로 치우친 경우에는 O(n)이 된다.

* HashSet - 순서 유지 안됨

  TreeSet - 넣어줄 때 정렬됨. 그래서 comparable 타입이어야 비교할 수 있음.

  LinkedHashSet - 추가한대로 추가 순서까지 유지해주고 싶을 때. 



## 출처

- 알고리즘 도감(책)
- 해쉬테이블 https://www.youtube.com/watch?v=Vi0hauJemxA
