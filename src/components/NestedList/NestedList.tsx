import React, { useState } from "react";
import styled from "styled-components";

interface ListItem {
  id: string;
  text: string;
  children: ListItem[];
}

const NestedList: React.FC = () => {
  const [list, setList] = useState<ListItem[]>([{ id: "1", text: "Root element", children: [] }]);

  const addChild = (parentId: string) => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      text: "New element",
      children: [],
    };

    setList((prevList) => {
      const updateChildren = (items: ListItem[]): ListItem[] => {
        return items.map((item) => {
          if (item.id === parentId) {
            return { ...item, children: [...item.children, newItem] };
          }
          if (item.children.length > 0) {
            return { ...item, children: updateChildren(item.children) };
          }
          return item;
        });
      };

      return updateChildren(prevList);
    });
  };

  const removeItem = (id: string) => {
    setList((prevList) => {
      const removeItemFromList = (items: ListItem[]): ListItem[] => {
        return items.filter((item) => {
          if (item.id === id) {
            return false;
          }
          if (item.children.length > 0) {
            item.children = removeItemFromList(item.children);
          }
          return true;
        });
      };

      return removeItemFromList(prevList);
    });
  };

  const editItemText = (id: string, newText: string) => {
    setList((prevList) => {
      const updateItemText = (items: ListItem[]): ListItem[] => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, text: newText };
          }
          if (item.children.length > 0) {
            return { ...item, children: updateItemText(item.children) };
          }
          return item;
        });
      };

      return updateItemText(prevList);
    });
  };

  const renderList = (items: ListItem[]) => {
    return (
      <List>
        {items.map((item) => (
          <ListItemWrapper key={item.id}>
            <ItemContent>
              <Input value={item.text} onChange={(e) => editItemText(item.id, e.target.value)} />
              <ButtonGroup>
                <Button onClick={() => addChild(item.id)}>Add</Button>
                {item.id !== "1" && <Button onClick={() => removeItem(item.id)}>Delete</Button>}
              </ButtonGroup>
            </ItemContent>
            {item.children.length > 0 && renderList(item.children)}
          </ListItemWrapper>
        ))}
      </List>
    );
  };

  return <Container>{renderList(list)}</Container>;
};

export default NestedList;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

const ListItemWrapper = styled.li`
  margin-bottom: 10px;
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
