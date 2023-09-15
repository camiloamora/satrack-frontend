import {
  CenteredContent,
  FullHeightContent,
  Button,
  Avatar,
  Spacer,
  Heading,
  AddButton,
  Paragraph,
  Dropdown,
} from "@camiloamora/components";
import TaskList from "../components/TaskList";
import { reorderTasks } from "../helpers";
import {
  useQuery,
  useQueryCache,
  useMutation,
  ReactQueryCacheProvider,
  queryCache,
} from "react-query";
import React, { useState, useEffect, useCallback } from "react";
import tasks from "../api";
import DateTask from "../components/DateTask";
import Select from "react-select";

const PlanningContainer = ({ initialData }) => {
  const categories = [
    {
      label: "Todos",
      value: "",
    },
    {
      label: "Compras",
      value: "Compras",
    },
    {
      label: "Deseos",
      value: "Deseos",
    },
    {
      label: "Personal",
      value: "Personal",
    },
    {
      label: "Otros",
      value: "Otros",
    },
    {
      label: "Trabajo",
      value: "Trabajo",
    },
  ];
  const [filterCategory, setFilterCategory] = useState('');
  const filterData = useCallback( () => {
    if(filterCategory !== '' && filterCategory !== null) {
      const data = tasks.getAll()
      const result = data.then(
        items => items.filter(p => p.categoria === filterCategory)
      )
      return result
    }

    return tasks.getAll();
  },[filterCategory])

  const [shouldStart, setShouldStart] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState(categories[1].value);
  const cache = useQueryCache();

  const { isLoading, error, data } = useQuery(["todos", { filter: filterCategory }], filterData, {
    initialData,
  });

  const [addTask] = useMutation((params) => tasks.create(params), {
    onSuccess: () => {
      cache.invalidateQueries("todos");
    },
  });

  const [updatePriorities] = useMutation(
    (params) => tasks.updatePriorities(params),
    {
      onSuccess: () => {
        cache.invalidateQueries("todos");
      },
    }
  );

  const [deleteTask] = useMutation((params) => tasks.delete(params), {
    onSuccess: () => {
      cache.invalidateQueries("todos");
    },
  });

  const [onCheckTask] = useMutation((params) => tasks.updateStatus(params), {
    onSuccess: () => {
      cache.invalidateQueries("todos");
    },
  })

  useEffect(() => {
    if (data?.length >= 1) {
      setShouldStart(true);
    } else {
      setShouldStart(false);
    }
  }, [data]);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const orderTask = reorderTasks(data, sourceIndex, destinationIndex);
    updatePriorities({ tasks: orderTask });
  };

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.value);
  };

  const handleChangeCategoryFilter = (e) => {
    const filter = e.value
    setFilterCategory(filter);
  }

  const handleAddTask = ({ description }) => {
    addTask({
      description: description,
      priority: data.length,
      category: selectedCategory,
      endDate: endDate,
    });
  };

  if (isLoading) return "Loading...";
  if (error) return `An error has ocurred ${error.message}`;

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <FullHeightContent
        content={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <Avatar src="https://randomuser.me/api/portraits/men/75.jpg"></Avatar>
              <Spacer.Vertical size="xs" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Heading size="lg">Hola, Camilo</Heading>
                <Heading size="md" color="primary">
                  ¿Cómo quieres empezar?
                </Heading>
              </div>
            </div>
            <Spacer.Horizontal size="xs" />
            <Heading size="lg">
              Ahora dime, ¿cuál es la primera tarea en la que trabajaras hoy?
            </Heading>
            <Spacer.Horizontal size="md" />
            <section className="planning--date">
              <div className="planning--column">
                <Paragraph size="md">Fecha de finalización</Paragraph>
                <DateTask endDate={endDate} setEndDate={setEndDate} />
                <Paragraph size="md">Categoria</Paragraph>
                <div className="planning--select">
                  <Select
                    options={categories}
                    isSearchable={false}
                    defaultValue={categories[1]}
                    id="category"
                    onChange={handleChangeCategory}
                  />
                </div>
              </div>
              <Spacer.Horizontal size="md" />
              <AddButton
                onAdd={(value) => handleAddTask({ description: value })}
                focusHelpText="Presiona enter"
                blurHelpText="Clic para continuar"
                type="primary"
                icon="plusCircle"
              >
                Toca para agregar la tarea
              </AddButton>
            </section>
            <Spacer.Horizontal size="xs" />
            <div
              style={{
                height: 5,
                margin: "10px 0",
                background: "#9879e9",
              }}
            />
            <Heading size="md">
              Filtros: { JSON.stringify(filterCategory === '' ? 'Sin filtros': filterCategory) }
            </Heading>
            <div className="planning--select">
                  <Select
                    options={categories}
                    isSearchable={false}
                    defaultValue={categories[0]}
                    id="filterCategory"
                    onChange={handleChangeCategoryFilter}
                  />
                </div>
            <Spacer.Horizontal size="md" />
            <TaskList
              tasks={data}
              onDragEnd={onDragEnd}
              onDeleteTask={deleteTask}
              onCheck={onCheckTask}
            />
          </div>
        }
        footer={
          shouldStart ? (
            <>
              <Spacer.Horizontal size="lg" />
              <Paragraph size="sm">
                !Organiza tus tareas de manera sencilla¡
              </Paragraph>
            </>
          ) : null
        }
      />
    </ReactQueryCacheProvider>
  );
};

export default PlanningContainer;
