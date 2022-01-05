import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  EventResizeDoneArg
} from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/common';
import { Redirect } from 'react-router';
import { useUser } from '../contexts';
import {
  useCreateReservationMutation,
  useDeleteReservationMutation,
  useHouseReservationsQuery
} from '../generated/graphql';
import Header from '../components/Header';

interface IState {
  event: {
    title: string;
    start: string;
    end: string;
    id: string;
  };
}

interface Props {
  houseId: string;
}

export const CalendarPage: React.FC<Props> = ({ houseId }) => {
  const { user } = useUser();
  const { data, refetch } = useHouseReservationsQuery({
    variables: {
      houseId: houseId
    },
    onError(err) {
      console.log(err);
    }
  });
  const [createReservation] = useCreateReservationMutation({
    onCompleted() {
      refetch();
    }
  });
  const [deleteReservation] = useDeleteReservationMutation({
    onCompleted() {
      refetch();
    }
  });

  if (!data) {
    return null;
  }

  if (!user) {
    return <Redirect to='/' />;
  }

  function formatDates(events: IState['event'][]) {
    const eventColors = ['#83adb5', '#2e4045', '#849baa', '#5e3c58', '#435274'];
    return events.map((event, i) => {
      let end = new Date(event.end);
      end.setDate(end.getDate() + 1);
      let newEnd = end.toISOString().slice(0, 10);
      return {
        ...event,
        end: newEnd,
        backgroundColor: eventColors[i],
        borderColor: eventColors[i]
      };
    });
  }

  const handleDateSelect = (selectInfo: DateSelectArg): void => {
    let title = prompt('Please enter a name for your reservation');
    selectInfo.view.calendar.unselect();

    selectInfo.end.setDate(selectInfo.end.getDate() - 1);
    selectInfo.endStr = selectInfo.end.toISOString().slice(0, 10);

    if (title) {
      try {
        createReservation({
          variables: {
            input: {
              title: title,
              start: selectInfo.startStr,
              end: selectInfo.endStr
            },
            houseId: houseId
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEventClick = async (eventClick: EventClickArg): Promise<void> => {
    const id = eventClick.event.id;
    if (window.confirm(`Do you want to delete '${eventClick.event.title}'?`)) {
      try {
        const response = await deleteReservation({
          variables: {
            reservationId: id
          }
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEventResize = (eventResize: EventResizeDoneArg): void => {};

  return (
    <div>
      <Header
        sidebar={true}
        sidebarOptions={[
          { text: 'Create House', link: '/createHouse' },
          { text: 'Edit House', link: `/house-details/${houseId}` },
          { text: 'House Users', link: `/house-users/${houseId}` }
        ]}
      />
      <div className='container mt-3'>
        <h1>{data && data.house.house.name} Calendar</h1>
        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin]}
          height='auto'
          initialView='dayGridMonth'
          events={data && formatDates(data.house.house.reservations)}
          selectable
          selectMirror
          eventColor='#2e4045'
          selectLongPressDelay={200}
          editable
          selectOverlap={false}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventResize={handleEventResize}
          titleFormat={
            window.screen.width < 400
              ? { month: 'short', year: 'numeric' }
              : { month: 'long', year: 'numeric' }
          }
        />
      </div>
    </div>
  );
};

export default CalendarPage;
