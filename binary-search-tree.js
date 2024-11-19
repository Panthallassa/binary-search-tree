class Node {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinarySearchTree {
	constructor(root = null) {
		this.root = root;
	}

	/** insert(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses iteration. */

	insert(val) {
		const newNode = new Node(val);

		if (!this.root) {
			this.root = newNode;
			return this;
		}

		let current = this.root;
		while (true) {
			if (val < current.val) {
				if (!current.left) {
					current.left = newNode;
					return this;
				}
				current = current.left;
			} else {
				if (!current.right) {
					current.right = newNode;
					return this;
				}
				current = current.right;
			}
		}
	}

	/** insertRecursively(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses recursion. */

	insertRecursively(val, current = this.root) {
		if (!this.root) {
			this.root = new Node(val);
			return this;
		}

		if (val < current.val) {
			if (!current.left) {
				current.left = new Node(val);
				return this;
			}
			return this.insertRecursively(val, current.left);
		} else {
			if (!current.right) {
				current.right = new Node(val);
				return this;
			}
			return this.insertRecursively(val, current.right);
		}
	}

	/** find(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses iteration. */

	find(val) {
		let current = this.root;

		while (current) {
			if (val === current.val) return current;
			current =
				val < current.val ? current.left : current.right;
		}

		return undefined;
	}

	/** findRecursively(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses recursion. */

	findRecursively(val, current = this.root) {
		if (!current) return undefined;
		if (val === current.val) return current;
		return val < current.val
			? this.findRecursively(val, current.left)
			: this.findRecursively(val, current.right);
	}

	/** dfsPreOrder(): Traverse the array using pre-order DFS.
	 * Return an array of visited nodes. */

	dfsPreOrder() {
		const result = [];

		function traverse(node) {
			if (!node) return;
			result.push(node.val);
			traverse(node.left);
			traverse(node.right);
		}

		traverse(this.root);
		return result;
	}

	/** dfsInOrder(): Traverse the array using in-order DFS.
	 * Return an array of visited nodes. */

	dfsInOrder() {
		const result = [];

		function traverse(node) {
			if (!node) return;
			traverse(node.left);
			result.push(node.val);
			traverse(node.right);
		}

		traverse(this.root);
		return result;
	}

	/** dfsPostOrder(): Traverse the array using post-order DFS.
	 * Return an array of visited nodes. */

	dfsPostOrder() {
		const result = [];

		function traverse(node) {
			if (!node) return;
			traverse(node.left);
			traverse(node.right);
			result.push(node.val);
		}

		traverse(this.root);
		return result;
	}

	/** bfs(): Traverse the array using BFS.
	 * Return an array of visited nodes. */

	bfs() {
		const result = [];
		const queue = [];

		if (this.root) queue.push(this.root);

		while (queue.length) {
			const current = queue.shift();
			result.push(current.val);

			if (current.left) queue.push(current.left);
			if (current.right) queue.push(current.right);
		}

		return result;
	}

	remove(val) {
		function removeNode(node, val) {
			if (!node) return null;

			if (val < node.val) {
				node.left = removeNode(node.left, val);
				return node;
			} else if (val > node.val) {
				node.right = removeNode(node.right, val);
				return node;
			} else {
				// Node with no children or one child
				if (!node.left) return node.right;
				if (!node.right) return node.left;

				// Node with two children: replace with in-order successor
				let successor = node.right;
				while (successor.left) successor = successor.left;
				node.val = successor.val;
				node.right = removeNode(node.right, successor.val);
				return node;
			}
		}

		this.root = removeNode(this.root, val);
		return this;
	}
}

module.exports = BinarySearchTree;
